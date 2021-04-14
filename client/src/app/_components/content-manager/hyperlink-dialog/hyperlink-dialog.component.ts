import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HyperlinkModel } from 'src/app/_models/hyperlinkModel';

@Component({
  selector: 'app-hyperlink-dialog',
  templateUrl: './hyperlink-dialog.component.html',
  styleUrls: ['./hyperlink-dialog.component.css']
})
export class HyperlinkDialogComponent implements OnInit {

  hyperlinkModel = {} as HyperlinkModel;

  @Output()
    cancelDialogEvent = new EventEmitter<boolean>();

  @Output()
    submitHyperlink = new EventEmitter<HyperlinkModel>();

  constructor(
    public dialogRef: MatDialogRef<HyperlinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public selection: string)
  {
    if(selection)
    {
      this.hyperlinkModel.textShown = selection;
    }
  }

  ngOnInit(): void {
  }

  submit()
  {
    this.dialogRef.close(this.hyperlinkModel);
  }

  cancel()
  {
    this.dialogRef.close();
  }

}
