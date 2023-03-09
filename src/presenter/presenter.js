import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import TripEventsView from '../view/trip-events-view.js';

export default class BoardPresenter {
  constructor() {
    this.boardComponent = new TripEventsView();
  }

  init(tripContainer, pointsModel) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.tripPoints = [...this.pointsModel.getPoint()];

    render(new EditFormView(), this.boardComponent.getElement());
    render(new SortView(), this.tripContainer);
    render(this.boardComponent, this.tripContainer);

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new WaypointView(this.tripPoints[i]), this.boardComponent.getElement());
    }

    render(new CreateFormView(), this.boardComponent.getElement());
  }
}
