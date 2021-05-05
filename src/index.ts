import './style.css';
import Model from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

let slider = new Presenter(new Model(), new View());

slider.create({
  min: -10,
  max: 10,
  step: 1,
  from: -10,
  // to: 3,
  // range: true,
  tip: true,
  connect: true,
  scale: true,
  // vertical: true
})

// slider.setConnect(false)
const min = document.querySelector('#min');
const max = document.querySelector('#max');
const step = document.querySelector('#step');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const range = document.querySelector('#range');
const tip = document.querySelector('#tip');
const connect = document.querySelector('#connect');
const scale = document.querySelector('#scale');
const vertical = document.querySelector('#vertical');

min.value = slider.model.getMin()
max.value = slider.model.getMax()
step.value = slider.model.getStep()
from.value = slider.model.getFrom()
to.value = slider.model.getTo()
range.checked = slider.model.getRange()
tip.checked = slider.model.getTip()
connect.checked = slider.model.getConnect()
scale.checked = slider.model.getScale()
vertical.checked = slider.model.getVertical()


min?.addEventListener('change', (e: InputEvent) => {
  slider.setMin(+e.target.value)
})

max?.addEventListener('change', (e: InputEvent) => {
  slider.setMax(+e.target.value)
})

from?.addEventListener('change', (e: InputEvent) => {
  slider.setFrom(+e.target.value)
})

to?.addEventListener('change', (e: InputEvent) => {
  slider.setTo(+e.target.value)
})

step?.addEventListener('change', (e: InputEvent) => {
  slider.setStep(+e.target.value)
})

range?.addEventListener('change', (e: InputEvent) => {
  let value = e.target.checked;
  slider.setRange(value)
})

scale?.addEventListener('change', (e: InputEvent) => {
  let value = e.target.checked;
  slider.setScale(value)
})

tip?.addEventListener('change', (e: InputEvent) => {
  let value = e.target.checked;
  slider.setTip(value)
})

connect?.addEventListener('change', (e: InputEvent) => {
  let value = e.target.checked;
  slider.setConnect(value)
})

vertical?.addEventListener('change', (e: InputEvent) => {
  let value = e.target.checked;
  slider.setVertical(value)
})


