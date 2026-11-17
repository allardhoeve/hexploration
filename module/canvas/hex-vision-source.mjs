/**
 * Vision source that gives a token without sight range one hex of radius, so it still explores the hex it stands in.
 * Applied on every initialization, including the per-token one that runs when a token moves.
 */
export default class HexVisionSource extends foundry.canvas.sources.PointVisionSource {
  /** @inheritDoc */
  _initialize(data) {
    super._initialize(data);
    if ( this.data.radius === 0 ) this.data.radius = canvas.grid.sizeX;
  }
}
