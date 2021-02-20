import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators} from '@angular/forms'

import { months , days } from '../../../core/utils/dateUtils';
import { IFormProductArrays, IProduct } from 'src/app/core/models/interfaces';
import { parameterOfProduct } from 'src/app/core/models/tuplas';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  //form

  form:FormGroup;
  

  //build form

  inputsArr:IFormProductArrays;

  constructor(
    private formBuilder:FormBuilder
  ) { 
    this.inputsArr = {
      froms: {
          arr: [undefined],
          values: ['']
        },
      kitchens:{
          arr: [undefined],
          values: ['']
        },
      ingredients: {
          arr: [undefined],
          values: ['']
        },
      diets: {
          arr: [undefined],
          values: ['']
        },
      dietaryRestriction: {
          arr: [undefined],
          values: ['']
        }
    }
    this.form = this.formBuilder.group({
      title:['' , Validators.required],
      subTitle:['' , Validators.required],
      image: ['' , Validators.required],
      price: ['' , Validators.required],
      descProduct: ['' , Validators.required],
      descPortion: ['' , Validators.required],
      time: ['' , Validators.required],
      types: ['lunch']
    })
  }
  ngOnInit(): void {

  }

  addItem(e:Event , type:parameterOfProduct):void{
    e.preventDefault();

    this.inputsArr[type].arr.push(undefined);
    this.inputsArr[type].values.push('');
  }

  deleteItem(e:Event , index:number , type:parameterOfProduct):void{
    e.preventDefault();

    this.inputsArr[type].arr.splice(index , 1)
    this.inputsArr[type].values.splice(index , 1)
  }

  writeValue(e:any , index:number , type:parameterOfProduct):void{
    const element:HTMLInputElement = e.target;
    const value:string = e.target.value;


    //assing

    element.value = value;

    this.inputsArr[type].values[index] = value;

    console.log(value , this.inputsArr[type].values);
  }

  setValueCreated(e:any , index:number , type:parameterOfProduct):string{
    const element:HTMLInputElement = e;

    return this.inputsArr[type].values[index];
  }

  onSubmit (e:Event):void {
    e.preventDefault();
    const values = this.form.value;
    const otherValues = this.inputsArr;

    const date = new Date();

    const newProduct:IProduct = {
      id: 11,
      title: values.title,
      subtitle: values.subTitle,
      image: values.image,
      prices: [
        {
          cost: Number(values.price),
          moneda: '$'
        }
      ],
      descriptions: {
        product: values.descProduct,
        portion: values.descPortion
      },
      time_delivery: values.time,
      type: values.types,
      from: otherValues.froms.values,
      kitchen : otherValues.kitchens.values,
      ingredients: otherValues.ingredients.values,
      diet_info: otherValues.diets.values,
      dietary_restricion: otherValues.dietaryRestriction.values,
      itemSold: 0,
      reviews: {
        five_start: 0,
        for_start: 0,
        three_start: 0,
        two_start: 0,
        one_start: 0
      },
      dateItemAdded: {
        year: date.getFullYear(),
        month: months[date.getMonth()],
        date: date.getDate(),
        day: days[date.getDay()]
      }
    }
    console.log(newProduct);
  }

  //terminar el envio de datos a la api
  //posicionar datos cuando viene los datos en la url
  //terminar el put de datos a la api
  //obtener un ID unico

} 
