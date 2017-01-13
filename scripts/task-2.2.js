'use strict';

class Widget {
    constructor(options) {
        this._el = options.element;

        this._file1 = this._el.querySelector('[data-selector="file1"]');
        this._file2 = this._el.querySelector('[data-selector="file2"]');
        this._result = this._el.querySelector('[data-selector="result"]');
        this._textPlace = this._el.querySelector('[data-selector="textPlace"]');

        this._file1Text = '';
        this._file2Text = '';

        this._file1.addEventListener('change', this._newFileUpload.bind(this));
        this._file2.addEventListener('change', this._newFileUpload.bind(this));
}

    _newFileUpload (event) {
        let file = {
            selector: event.target.dataset.selector,
            text: ''
        };

        let solve = this._solve.bind(this);

        let fileReader = new FileReader();

        fileReader.onload = function(event) {
            file.text = event.target.result;
            solve(file);
        };

        if (event.target.files[0]) {
            fileReader.readAsText(event.target.files[0]) 
        } else {
            solve(file);
        }
    }

    _solve(file) {
        let text;
        let result = '';

        this._setText(file);
        text = this._file1Text + this._file2Text;

        if (text) {
            let re = new RegExp('[^0-9]+','gm');

            let numbersFromText = text.replace(re, ' ').trim().split(' ');

            numbersFromText = numbersFromText.map(el => {
                return Number(el);
            });

            result = numbersFromText.sort((a,b)=>{return a-b}).join(' ');
        }

        this._result.innerHTML = text ? `<h4>Result</h4><span>${result}</span>` : '';
        this._textPlace.innerHTML = text ? `<h4>Text of 2 files</h4><pre>${text}</pre>`: '';
    }

    _setText(file) {
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