import './style.css';
import Model from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

let slider = new Presenter(new Model(), new View());

slider.create({
  min: -100,
  max: 100,
  step: 1,
  from: -80,
  to: 3,
  range: true,
  tip: true,
  connect: true,
  // vertical: true
})




