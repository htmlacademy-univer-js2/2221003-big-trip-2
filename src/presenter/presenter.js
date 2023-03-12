import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import TripEventsView from '../view/trip-events-view.js';

export default class TripPresenter {
  constructor(tripContainer) {
    this.eventsList = new TripEventsView();
    this.tripContainer = tripContainer;
  }

  init(pointsModel) {
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(new SortView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new EditFormView(this.boardPoints[0], this.destinations, this.offers), this.eventsList.getElement());

    for (const point of this.boardPoints) {
      render(new WaypointView(point, this.destinations, this.offers), this.eventsList.getElement());
    }
  }
}
