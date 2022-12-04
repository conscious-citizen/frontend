//https://medium.com/@tarekabdelkhalek/how-to-create-a-drag-and-drop-file-uploading-in-angular-78d9eba0b854
import {Directive, EventEmitter, HostBinding, HostListener, Output} from "@angular/core";

@Directive({
    selector: '[appDnd]'
})
export class DndDirective {
    @HostBinding('class.fileover') fileOver: boolean = false;
    @Output() fileDropped = new EventEmitter<any>();

    // Dragover listener
    // @ts-ignore
    @HostListener('dragover', ['$event']) onDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = true;
    }

    // Dragleave listener
    // @ts-ignore
    @HostListener('dragleave', ['$event']) public onDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = false;
    }

    // Drop listener
    // @ts-ignore
    @HostListener('drop', ['$event']) public onDrop(e) {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = false;
        let files = e.dataTransfer.files;
        if (files.length > 0) {
            this.fileDropped.emit(files);
        }
    }
}

