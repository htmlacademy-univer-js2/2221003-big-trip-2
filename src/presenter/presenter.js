import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import TripEventsView from '../view/trip-events-view.js';

export default class TripPresenter {

  #pointsList = null;
  #tripContainer = null;
  #pointsModel = null;

  #tripPoints = [];

  constructor() {
    // this.eventsList = new TripEventsView();
    this.#pointsList = new TripEventsView();
  }

  init(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#tripPoints = [...this.#pointsModel.point];

    render(new SortView(), this.#tripContainer);
    render(this.#pointsList, this.#tripContainer);
    render(new EditFormView(this.#tripPoints[0]), this.#pointsList.element);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      render(new WaypointView(this.#tripPoints[i]), this.#pointsList.element);
    }
  }
}
