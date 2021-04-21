import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Picture } from 'src/app/_models/picture';
import { PictureService } from 'src/app/_services/picture.service';

@Component({
  selector: 'app-picture-dialog',
  templateUrl: './picture-dialog.component.html',
  styleUrls: ['./picture-dialog.component.css']
})
export class PictureDialogComponent implements OnInit {

  pictureFile: any;
  pictureDescription: string;
  pictureModel: Picture = new Picture();

  constructor(
    public dialogRef: MatDialogRef<PictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private blogPostId: number,
    private pictureService: PictureService) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    const formData = new FormData();
    formData.append('file', this.pictureFile, this.pictureDescription)

    this.dialogRef.close(formData);
  }

  onCancel()
  {
    this.dialogRef.close();
  }

}
