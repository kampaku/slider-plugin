import './style.css';
import Model from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

let slider = new Presenter(new Model(), new View());

slider.create({
  min: -100,
  max: 100,
  step: 10,
  from: -10,
  to: 3,
  range: true,
  tip: true,
  connect: true,
  scale: true,
  // vertical: true
})




