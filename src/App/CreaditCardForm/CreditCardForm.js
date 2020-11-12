import React, { Component } from "react";
import "./CreditCardForm.scss";

class CreditCardForm extends Component {
  state = {
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCVV2: "",
    validForm: false,
    numberValidation: "valid",
    numberValid: false,
    monthValidation: "valid",
    monthValid: false,
    yearValidation: "valid",
    yearValid: false,
    cvv2Validation: "valid",
    cvv2Valid: false,
    test: 1111111111111111,
    isFormSend: false,
    message: "",
  };

  handleChangeCardNumber = (event) => {
    const cardNumberLength = Object.keys(event.target.value).length;
    cardNumberLength === 16 && Number.isInteger(+event.target.value)
      ? this.setState(
          {
            cardNumber: event.target.value,
            numberValidation: "valid",
            numberValid: true,
          },
          this.validateForm
        )
      : this.setState(
          {
            cardNumber: event.target.value,
            numberValidation: "invalid",
            numberValid: false,
          },
          this.validateForm
        );
  };

  handleChangeCardMonth = (event) => {
    +event.target.value >= 1 &&
    +event.target.value <= 12 &&
    Number.isInteger(+event.target.value)
      ? this.setState(
          {
            cardMonth: event.target.value,
            monthValidation: "valid",
            monthValid: true,
          },
          this.validateForm
        )
      : this.setState(
          {
            cardMonth: event.target.value,
            monthValidation: "invalid",
            monthValid: false,
          },
          this.validateForm
        );
  };

  handleChangeCardYear = (event) => {
    +event.target.value >= 1900 &&
    +event.target.value <= 2100 &&
    Number.isInteger(+event.target.value)
      ? this.setState(
          {
            cardYear: event.target.value,
            yearValidation: "valid",
            yearValid: true,
          },
          this.validateForm
        )
      : this.setState(
          {
            cardYear: event.target.value,
            yearValidation: "invalid",
            yearValid: false,
          },
          this.validateForm
        );
  };

  handleChangeCardCVV2 = (event) => {
    const cvv2Length = Object.keys(event.target.value).length;
    cvv2Length === 3 && Number.isInteger(+event.target.value)
      ? this.setState(
          {
            cardCVV2: event.target.value,
            cvv2Validation: "valid",
            cvv2Valid: true,
          },
          this.validateForm
        )
      : this.setState(
          {
            cardCVV2: event.target.value,
            cvv2Validation: "invalid",
            cvv2Valid: false,
          },
          this.validateForm
        );
  };

  validateForm = () => {
    this.setState({
      validForm:
        this.state.numberValid &&
        this.state.monthValid &&
        this.state.yearValid &&
        this.state.cvv2Valid,
    });
  };

  renderMessage = () => {
    return <h2 className="form__message">{this.state.message}</h2>;
  };

  sendForm = (event) => {
    event.preventDefault();
    +this.state.cardNumber === this.state.test
      ? this.setState((prevState) => ({
          message: `Thank you for the order! Your card ${prevState.cardNumber} has been successfully verified and added to the database `,
        }))
      : this.setState((prevState) => ({
          message: `Sorry! Your card ${prevState.cardNumber} is not in the database!`,
        }));
    this.setState({
      isFormSend: true,
    });
  };

  renderForm = () => {
    return (
      <>
        <form className="form" onSubmit={this.sendForm}>
          <div className="form__row">
            <div className="form__front">
              <div className="form__card-number">
                <div className="form__title">
                  Введите реквизиты платежной карты
                </div>
                <div className="form__subtitle">Номер платежной карты</div>
                <input
                  className={this.state.numberValidation}
                  type="text"
                  name="cardNumber"
                  value={this.state.cardNumber}
                  onChange={this.handleChangeCardNumber}
                  maxLength="16"
                  placeholder="XXXXXXXXXXXXXXXX"
                />
              </div>
              <div className="form__card-validity">
                <div className="form__subtitle">Срок действия</div>
                <div className="form__month">
                  <input
                    className={this.state.monthValidation}
                    type="text"
                    name="cardMonth"
                    value={this.state.cardMonth}
                    onChange={this.handleChangeCardMonth}
                    maxLength="2"
                    placeholder="01"
                  />
                </div>
                <div className="form__year">
                  <input
                    className={this.state.yearValidation}
                    type="text"
                    name="cardYear"
                    value={this.state.cardYear}
                    onChange={this.handleChangeCardYear}
                    maxLength="4"
                    placeholder="2020"
                  />
                </div>
              </div>
            </div>
            <div className="form__back">
              <div className="form__card-cvv2">
                <div className="form__line"></div>
                <div className="form__subtitle">CVV2/CVC2</div>
                <input
                  className={this.state.cvv2Validation}
                  type="password"
                  name="cardCVV2"
                  value={this.state.cardCVV2}
                  onChange={this.handleChangeCardCVV2}
                  maxLength="3"
                  placeholder="***"
                />
              </div>
            </div>
          </div>
          <div className="form__button">
            <button type="submit" disabled={!this.state.validForm}>
              Отправить
            </button>
          </div>
        </form>
      </>
    );
  };

  render() {
    return (
      <>
        <div className="container">
          <h2 className="page__subtitle">Credit Card Form</h2>
          {this.state.isFormSend !== true
            ? this.renderForm()
            : this.renderMessage()}
        </div>
      </>
    );
  }
}

export default CreditCardForm;
