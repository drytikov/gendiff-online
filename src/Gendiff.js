import React from 'react';
import axios from 'axios';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstFile: null,
      secondFile: null,
      outputText: '',
      selectedOption: 'sructuredText',
    };
  }

  onChangeFile1 = (e) => {
    this.setState({ firstFile: e.target.files[0] });
  }

  onChangeFile2 = (e) => {
    this.setState({ secondFile: e.target.files[0] });
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', this.state.firstFile);
    formData.append('files', this.state.secondFile);
    formData.append('outputFormat', this.state.selectedOption);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.post('/upload', formData, config);
    this.setState({ outputText: res.data });
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  }

  render() {
    const { form } = this.state;
    return (
      <div className="container">
          <h1>Сравнение файлов конфигурации</h1>
          <br />
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group row">
              <label htmlFor="file-1" className="col-sm-2">Первый файл</label>
              <div className="col-sm-10">
                <input type="file" onChange={this.onChangeFile1} className="form-control" id="file-1" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="file-2" className="col-sm-2">Второй файл</label>
              <div className="col-sm-10">
                <input type="file" onChange={this.onChangeFile2} className="form-control" id="file-2" />
              </div>
            </div>
            <fieldset className="form-group">
              <div className="row">
                <div className="col-sm-2">Формат вывода</div>
                <div className="col-sm-10">
                  <div className="form-check ml-4">
                    <input className="form-check-input" type="radio" name="gridRadios"
                    id="gridRadios1" value="sructuredText" checked={this.state.selectedOption === 'sructuredText'}
                    onChange={this.handleOptionChange} />
                    <label className="form-check-label" htmlFor="gridRadios1">
                      Рекурсивный
                    </label>
                  </div>
                  <div className="form-check ml-4">
                    <input className="form-check-input" type="radio" name="gridRadios"
                    id="gridRadios2" value="plain" checked={this.state.selectedOption === 'plain'}
                    onChange={this.handleOptionChange} />
                    <label className="form-check-label" htmlFor="gridRadios2">
                      Плоский
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="form-group row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary" id="submit">Отправить</button>
              </div>
            </div>
          </form>
          <br />
          <h4>Результат:</h4>
          <div><pre>{this.state.outputText}</pre></div>
      </div>
    );
  }
}
