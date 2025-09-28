import {
  Bone,
  BufferGeometry,
  Float32BufferAttribute,
  Skeleton,
  Uint8BufferAttribute, Vector3
} from "three";
import type {TextureConfig} from "@/bodyParts";

const SKIN_TEXTURE_SIZE = 64;

export class BodyPartGeometry extends BufferGeometry{
  public readonly width: number;
  public readonly height: number;
  public readonly depth: number;
  private readonly bendCount: number;
  public readonly bendBone?: Bone;
  public readonly baseBone?: Bone;
  public readonly skeleton?: Skeleton;

  constructor(width: number, height: number, depth: number, textureConfig: TextureConfig, bendable = false, bendDirection: "bottom" | "top" = "bottom") {
    super();

    this.width = width;
    this.height = height;
    this.depth = depth;
    this.bendCount = bendable ? 2 : 1;

    const verts = this._generateVerts();
    const indexes = this._generateIndexes();
    const uv = this._generateUV(textureConfig);

    this.setIndex(indexes);
    this.setAttribute("position", new Float32BufferAttribute(verts, 3));
    this.setAttribute("uv", new Float32BufferAttribute(uv, 2));
    // this.computeVertexNormals();

    if (bendable) {
      const { skinIndexes, skinWeights, bendVerts } = this._generateSkinAttrs(bendDirection);

      this.setAttribute("skinIndex", new Uint8BufferAttribute(skinIndexes, 4));
      this.setAttribute("skinWeight", new Float32BufferAttribute(skinWeights, 4));
      // indicates which verts should change position
      this.setAttribute("bendVert", new Float32BufferAttribute(bendVerts, 1));

      const bones: Bone[] = [];

      const base = new Bone();
      const bend = new Bone();

      base.position.y = width / 2;
      bend.position.y = -width / 2;

      base.add(bend);
      bones.push(base, bend);

      this.skeleton = new Skeleton(bones);
      this.baseBone = base;
      this.bendBone = bend;
    }
  }

  private _generateVerts() {
    const wHalf = this.width / 2;
    const dHalf = this.depth / 2;
    const hHalf = this.height / 2;

    const bendHeight = this.height / this.bendCount;

    const x = [-wHalf, wHalf];
    const z = [-dHalf, dHalf];
    const y = [hHalf, -hHalf];

    const verts: number[] = [];

    const pushVert = (x: number, y: number, z: number) => verts.push(x, y, x > 0 ? -z : z);

    // sides verts
    for (const dx of x) {
      for (const dz of z) {
        for (let dy = hHalf; dy >= -hHalf; dy -= bendHeight) {
          pushVert(dx, dy, dz);
        }
      }
    }

    for (let dy = hHalf; dy >= -hHalf; dy -= bendHeight) {
      pushVert(-wHalf, dy, -dHalf);
    }

    // top/bottom face verts
    for (const dy of y) {
      for (const dx of x) {
        for (const dz of z) {
          verts.push(dx, dy, dz);
        }
      }
    }

    return verts;
  }

  private _generateIndexes() {
    // edges * (bendCnt + 1)
    const sidesVertCount = 5 * (this.bendCount + 1);
    const indexes: number[] = [];

    for (let v = 0; v < sidesVertCount; v++) {
      if (v % (this.bendCount + 1) === this.bendCount) {
        continue;
      }

      const under = v + 1;
      const next = (v + this.bendCount + 1) % sidesVertCount;
      const opposite = next + 1;
      indexes.push(
        under, next, v,
        under, opposite, next,
      );
    }

    const topV = sidesVertCount;
    const botV = topV + 4;

    indexes.push(
      // top indexes
      topV, topV + 1, topV + 3,
      topV + 3, topV + 2, topV,
      // bottom indexes
      botV + 3, botV + 1, botV,
      botV, botV + 2, botV + 3,
    );

    return indexes;
  }

  private _generateUV(textureConfig: TextureConfig) {
    const { textureStart, sidesStart } = textureConfig;
    const textureSizes = textureConfig.textureSizes || new Vector3(this.width, this.height, this.depth);

    const normalizeScale = 1 / SKIN_TEXTURE_SIZE;

    const bendHeight = textureSizes.y / this.bendCount;
    const uv: number[] = [];

    const start = textureStart.clone();
    start.y = SKIN_TEXTURE_SIZE - start.y;

    const sidesDu = [0, textureSizes.z, textureSizes.x, textureSizes.z, textureSizes.x];

    let curX = start.x;
    let curY = start.y - textureSizes.z;
    if (sidesStart) {
      curX = sidesStart.x;
      curY = SKIN_TEXTURE_SIZE - sidesStart.y;
    }

    for (const du of sidesDu) {
      for (let s = 0; s <= this.bendCount; s++) {
        const dv = s * bendHeight;
        const v = (curX + du) * normalizeScale;
        const u = (curY - dv) * normalizeScale;
        uv.push(v, u);
      }
      curX += du;
    }

    curX = start.x + textureSizes.z;
    curY = start.y;

    const topDu = [0, textureSizes.x, textureSizes.x, textureSizes.x];
    let idx = 0;
    for (const du of topDu) {
      const fix = idx % 2 === 0 ? 0 : -0.022;

      uv.push((curX + du + fix) * normalizeScale, (curY) * normalizeScale);
      uv.push((curX + du + fix) * normalizeScale, (curY - textureSizes.z) * normalizeScale);

      if (idx % 2 === 0) {
        curX += du;
      }
      idx++;
    }

    return uv;
  }

  private _generateSkinAttrs(bendDirection: "bottom" | "top") {
    // 3 vert per col + 4 vert per top/bot faces
    const vertCount = 5 * 3 + 2 * 4;
    const topStartVertIdx = 5 * 3;

    const skinIndexes = [];
    const skinWeights = [];
    const bendVerts = [];

    for (let vert = 0; vert < vertCount; vert++) {
      skinWeights.push(1,0,0,0);

      const isSidesVert = vert < topStartVertIdx;
      const isBottomVert = vert >= topStartVertIdx + 4;
      const isTopVert = !isSidesVert && !isBottomVert;

      if (bendDirection === "bottom" && (isSidesVert && vert % 3 >= 2 || isBottomVert)) {
        skinIndexes.push(1,0,0,0);
      } else if (bendDirection === "top" && (isSidesVert && vert % 3 < 2 || isTopVert)) {
        skinIndexes.push(1,0,0,0);
      } else {
        skinIndexes.push(0,0,0,0);
      }

      if (vert < topStartVertIdx && vert % 3 === 1) {
        bendVerts.push(1);
      } else {
        bendVerts.push(0);
      }
    }

    return { skinWeights, skinIndexes, bendVerts };
  }
}