import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Picture } from 'src/app/_models/picture';
import { PictureService } from 'src/app/_services/picture.service';

@Component({
  selector: 'app-picture-dialog',
  templateUrl: './picture-dialog.component.html',
  styleUrls: ['./picture-dialog.component.css']
})
export class PictureDialogComponent implements OnInit {

  files: FileList;
  pictures: Picture[] = [];

  constructor(
    public dialogRef: MatDialogRef<PictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private blogPostId: number,
    private pictureService: PictureService) { }

  ngOnInit(): void {
  }

  onCancel()
  {
    this.dialogRef.close();
  }

  loadDroppedFiles(files: FileList)
  {
    this.files = files;
    this.uploadFiles(files, () => this.dialogRef.close(this.pictures));
  }

  fileBrowseHandler(event: Event)
  {

  }

  uploadFiles(files: FileList, next: any)
  {
    let picturesUploaded: Subscription;

    Array.from(files).forEach(file =>
    {
      const formData = new FormData();

      formData.append('file', file, file.name);

      picturesUploaded = this.pictureService.uploadPicture(this.blogPostId, formData).subscribe(
        (response: Picture) => {
          this.pictures.push(response);
      });
    });

    picturesUploaded?.add(next).unsubscribe();
  }



}
