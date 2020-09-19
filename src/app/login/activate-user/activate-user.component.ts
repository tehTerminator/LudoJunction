import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SqlResponse } from '../../shared/collection';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {
  private id: number;
  activationForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    console.log(this.id);

    this.activationForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    });
  }

  onSubmit() {
    console.log('On Submit');
    const url = environment.url.user.activate;
    const id = this.id;
    const otp = this.activationForm.get('otp').value;
    this.http.post(url, {id, otp})
    .subscribe((res: SqlResponse) => {
      console.log(res);
      if (res.status) {
        this.router.navigate(['/login']);
      } else {
        console.log(res.message)
      }
    });
  }

}
