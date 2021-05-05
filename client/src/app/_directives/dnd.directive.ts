import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.fileOver = true;
    }

  @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.fileOver = false;
    }

  @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();

      this.fileOver = false;
      const files = event.dataTransfer.files;

      console.log("dragdrop");

      if(files.length > 0)
      {
        this.onFileDropped.emit(files);
      }
    }

  @HostBinding('class.fileover')
    fileOver: boolean;

  @Output()
    onFileDropped = new EventEmitter<FileList>();

  constructor() { }

}
