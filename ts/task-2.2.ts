interface Options {
    element: HTMLElement;
}

interface FileObject {
    selector: string;
    text: string;
}

interface FileReaderEventTarget extends EventTarget {
    result:string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

interface InputFileEventTarget extends HTMLElement {
    files: File[];
}

interface InputFileEvent extends Event {
    target: InputFileEventTarget;
}

class Widget {
    private _el: HTMLElement;
    private _file1: HTMLElement;
    private _file2: HTMLElement;
    private _result: HTMLElement;
    private _textPlace: HTMLElement;
    private _file1Text: string;
    private _file2Text: string;

    constructor(options:Options) {
        this._el = options.element;

        this._file1 = <HTMLElement>this._el.querySelector('[data-selector="file1"]');
        this._file2 = <HTMLElement>this._el.querySelector('[data-selector="file2"]');
        this._result = <HTMLElement>this._el.querySelector('[data-selector="result"]');
        this._textPlace = <HTMLElement>this._el.querySelector('[data-selector="textPlace"]');

        this._file1Text = '';
        this._file2Text = '';

        this._file1.addEventListener('change', this._newFileUpload.bind(this));
        this._file2.addEventListener('change', this._newFileUpload.bind(this));
    }

    private _newFileUpload (event: InputFileEvent): void {
        let file: FileObject = {
            selector: (event.target).dataset['selector'],
            text: ''
        };

        let solve: Function = this._solve.bind(this);

        let fileReader = new FileReader();

        fileReader.onload = function(event: FileReaderEvent) {
            file.text = event.target.result;
            solve(file);
        };

        if (event.target.files[0]) {
            fileReader.readAsText(event.target.files[0])
        } else {
            solve(file);
        }
    }

    private _solve(file: FileObject) {
        let text: string;
        let result: string = '';

        this._setText(file);
        text = this._file1Text + this._file2Text;

        if (text) {
            let re = new RegExp('[^0-9]+','gm');

            let numbersFromText: string[] | number[] = text.replace(re, ' ').trim().split(' ');

            numbersFromText = numbersFromText.map(el => {
                return Number(el);
            }).sort((a: number, b: number): number => {return a - b});

            result = numbersFromText.join(' ');
        }

        this._result.innerHTML = text ? `<h4>Result</h4><span>${result}</span>` : '';
        this._textPlace.innerHTML = text ? `<h4>Text of 2 files</h4><pre>${text}</pre>`: '';
    }

    private _setText(file: FileObject) {
        if (file.selector === 'file1') {
            this._file1Text = file.text;
        } else {
            this._file2Text = file.text;
        }
    }
}

new Widget({
    element: document.getElementById('myComponentContainer')
});
