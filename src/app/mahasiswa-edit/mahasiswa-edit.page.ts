import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';


@Component({
  selector: 'app-mahasiswa-edit',
  templateUrl: './mahasiswa-edit.page.html',
  styleUrls: ['./mahasiswa-edit.page.scss'],
})
export class MahasiswaEditPage implements OnInit {
  nim: any;
  nama: any;
  alamat: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-shadow
    public LoadingController: LoadingController,
  ) {
    this.route.params.subscribe((param: any) => {
      this.nim = param.nim;
      console.log(this.nim);
      this.ambilMahasiswa(this.nim);
    });
  }

  ngOnInit() {
  }


  ambilMahasiswa(nim) {
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.ambilMahasiswa(nim).subscribe((res: any) => {
      console.log('sukses', res);
      // eslint-disable-next-line prefer-const
      let mahasiswa = res;
      //console.log(mahasiswa);
      this.nama = mahasiswa.nama;
      this.alamat = mahasiswa.alamat;
    }, (error: any) => {
      console.log('error', error);
      alert('gagal ambil data');
    });
  }


  editMahasiswa() {
    // eslint-disable-next-line no-underscore-dangle, prefer-const
    let url = this._apiService.apiURL() + '/edit.php';
    Http.request({
      method: 'POST',
      // eslint-disable-next-line object-shorthand
      url: url,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
      data: {
        nim: this.nim,
        nama: this.nama,
        alamat: this.alamat,
      },
    }).then((data) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Edit Data Mahasiswa',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/mahasiswa');
    }, (err) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Edit Data Mahasiswa',
        buttons: ['OK']
      }).then(res => {
        res.present();
      });
    });
  }

}
