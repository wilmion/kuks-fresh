import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ApiService } from '../../../core/services/api.service';
import { UpdateStoreService } from '../../../core/services/updateStore/update-store.service';

import { months, days } from '../../../core/utils/dateUtils';
import { IFormProductArrays, IProduct } from 'src/app/core/models/interfaces';
import { parameterOfProduct } from 'src/app/core/models/tuplas';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  //dates

  stateSubcription: Subscription | undefined;
  productsCount: number = 0;
  product: IProduct | undefined;
  id: string | 'create' = '';

  //form

  form: FormGroup;

  //build form

  inputsArr: IFormProductArrays;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private updateService: UpdateStoreService,
    private router: ActivatedRoute,
    private productState: Store<{ products: IProduct[] }>
  ) {
    this.inputsArr = {
      froms: {
        arr: [undefined],
        values: [''],
      },
      kitchens: {
        arr: [undefined],
        values: [''],
      },
      ingredients: {
        arr: [undefined],
        values: [''],
      },
      diets: {
        arr: [undefined],
        values: [''],
      },
      dietaryRestriction: {
        arr: [undefined],
        values: [''],
      },
    };
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      descProduct: ['', Validators.required],
      descPortion: ['', Validators.required],
      time: ['', Validators.required],
      types: ['lunch'],
    });

    this.router.params.subscribe((param) => {
      this.id = param.id;
      this.subscription();
    });
  }
  ngOnInit(): void {}

  subscription(): void {
    this.stateSubcription = this.productState
      .select('products')
      .subscribe((data) => {
        this.isLoading = data.length === 0;
        this.product = data.find((p) => p._id === this.id);
        this.productsCount = data.length;
        this.setInputsArr(data);
      });
  }

  addItem(e: Event, type: parameterOfProduct): void {
    e.preventDefault();

    this.inputsArr[type].arr.push(undefined);
    this.inputsArr[type].values.push('');
  }

  deleteItem(e: Event, index: number, type: parameterOfProduct): void {
    e.preventDefault();

    this.inputsArr[type].arr.splice(index, 1);
    this.inputsArr[type].values.splice(index, 1);
  }

  writeValue(e: any, index: number, type: parameterOfProduct): void {
    const element: HTMLInputElement = e.target;
    const value: string = e.target.value;

    //assing

    element.value = value;

    this.inputsArr[type].values[index] = value;
  }

  setValueCreated(e: any, index: number, type: parameterOfProduct): string {
    const element: HTMLInputElement = e;

    return this.inputsArr[type].values[index];
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    const values = this.form.value;
    const otherValues = this.inputsArr;

    const date = new Date();

    const newProduct: IProduct = {
      title: values.title,
      subtitle: values.subTitle,
      image: values.image,
      prices: [
        {
          cost: Number(values.price),
          moneda: '$',
        },
      ],
      descriptions: {
        product: values.descProduct,
        portion: values.descPortion,
      },
      time_delivery: values.time,
      type: values.types,
      from: otherValues.froms.values,
      kitchen: otherValues.kitchens.values,
      ingredients: otherValues.ingredients.values,
      diet_info: otherValues.diets.values,
      dietary_restricion: otherValues.dietaryRestriction.values,
      itemSold: 0,
      reviews: {
        five_start: 0,
        for_start: 0,
        three_start: 0,
        two_start: 0,
        one_start: 0,
      },
      dateItemAdded: {
        year: date.getFullYear(),
        month: months[date.getMonth()],
        date: date.getDate(),
        day: days[date.getDay()],
      },
    };
    this.isLoading = true;
    if (this.id !== 'create') {
      newProduct._id = this.id;

      this.apiService.updateProduct(newProduct).subscribe(
        () => {
          this.updatingStore();
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      this.apiService.postProduct(newProduct).subscribe(
        () => {
          this.updatingStore();
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }
  }

  //build date

  setInputsArr(products: IProduct[]): void {
    const product: IProduct | undefined = products.find(
      (item) => item._id === this.id
    );

    if (product) {
      this.inputsArr = {
        froms: {
          arr: [...product.from].fill(''),
          values: [...product.from],
        },
        kitchens: {
          arr: [...product.kitchen].fill(''),
          values: [...product.kitchen],
        },
        ingredients: {
          arr: [...product.ingredients].fill(''),
          values: [...product.ingredients],
        },
        diets: {
          arr: [...product.diet_info].fill(''),
          values: [...product.diet_info],
        },
        dietaryRestriction: {
          arr: [...product.dietary_restricion].fill(''),
          values: [...product.dietary_restricion],
        },
      };
      this.form = this.formBuilder.group({
        title: [product.title, Validators.required],
        subTitle: [product.subtitle, Validators.required],
        image: [product.image, Validators.required],
        price: [product.prices[0].cost, Validators.required],
        descProduct: [product.descriptions.product, Validators.required],
        descPortion: [product.descriptions.portion, Validators.required],
        time: [product.time_delivery, Validators.required],
        types: [product.type],
      });
      console.log('updated');
      if (this.stateSubcription) {
        this.stateSubcription.unsubscribe();
      }
    }
  }
  updatingStore(): void {
    this.updateService.updated();
    this.inputsArr = {
      froms: {
        arr: [],
        values: [],
      },
      kitchens: {
        arr: [],
        values: [],
      },
      ingredients: {
        arr: [],
        values: [],
      },
      diets: {
        arr: [],
        values: [],
      },
      dietaryRestriction: {
        arr: [],
        values: [],
      },
    };
    this.stateSubcription = this.productState
      .select('products')
      .subscribe((data) => {
        this.isLoading = data.length === 0;
        this.product = data.find((p) => p._id === this.id);
        this.productsCount = data.length;
        this.setInputsArr(data);
      });
  }
}
