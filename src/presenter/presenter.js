import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import TripEventsView from '../view/trip-events-view.js';
import NoPointView from '../view/no-point-view.js';
import { isEscKeyDown } from '../utils.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #tripPoints = [];

  #pointsList = new TripEventsView();

  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.point];
    this.#renderBoard();
  }

  #renderBoard = () => {
    if (this.#tripPoints.length === 0) {
      render(new NoPointView(), this.#tripContainer);
    }

    else {
      render(new SortView(), this.#tripContainer);
      render(this.#pointsList, this.#tripContainer);
      for (let i = 0; i < this.#tripPoints.length; i++) {
        this.#renderPoints(this.#tripPoints[i]);
      }
    }
  };

  #renderPoints = (point) => {
    const pointComponent = new WaypointView(point);
    const pointEditComponent = new EditFormView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (isEscKeyDown) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    // pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    //   replaceFormToPoint();
    //   document.removeEventListener('keydown', onEscKeyDown);
    // });

    pointEditComponent.setCloseClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsList.element);
  };
}
