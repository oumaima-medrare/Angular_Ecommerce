import { Component } from '@angular/core';
import { ContactformService } from 'src/app/services/contactform.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent {
  public contactForm = {
    subject: '',
    message: '',
    sender: ''
  };

  constructor(private contactformService : ContactformService, private snack: MatSnackBar){
  }

  sendContactForm(){
    if (this.contactForm.subject === '' || this.contactForm.message === '') {
      this.snack.open(
        'Please enter your password & your username and try again ',
        '',
        { duration: 3000 }
      );
      return;
    }

    const userSession = sessionStorage.getItem('user');
    if (userSession != null) this.contactForm.sender= JSON.parse(userSession).email;
    this.contactformService.sendContact(this.contactForm).subscribe((result: any) => {
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Thank you ' + result.username,
          text: 'Message sent successfully',
        });
      }
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    })
  }

}
