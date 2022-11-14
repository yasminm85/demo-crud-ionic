import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';
import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-mahasiswa-tambah',
  templateUrl: './mahasiswa-tambah.page.html',
  styleUrls: ['./mahasiswa-tambah.page.scss'],
})
export class MahasiswaTambahPage implements OnInit {
  nim: any;
  alamat: any;
  nama: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,

  ) { }

  ngOnInit() {
  }

  addMahasiswa() {
    // eslint-disable-next-line no-underscore-dangle, prefer-const
    let url = this._apiService.apiURL() + '/tambah.php';
    Http.request({
      method: 'POST',
      // eslint-disable-next-line object-shorthand
      url: url,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
      data: {
        nim: this.nim,
        nama: this.nama,
        alamat: this.alamat
      },
    }).then((data) => {
      this.nim = '';
      this.nama = '';
      this.alamat = '';
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Input data Mahasiswa',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/mahasiswa');
    }, (error) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Input data Mahasiswa',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
    });
  }

}
