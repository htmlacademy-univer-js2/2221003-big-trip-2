import { createMockPoints } from "../mock/task";

export default class PointsModel {
  points = Array.from({ length: 10 }, createMockPoints);

  getPoints = () => this.points;
}
