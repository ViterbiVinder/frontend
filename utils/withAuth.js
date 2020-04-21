import React from 'react';  
import Router from 'next/router'

export default function (WrappedComponent) {  
  class Authenticate extends React.Component {

    constructor() {
      super()
      this.state = {
        isAuthenticated: false
      }
    }

    async componentDidMount() {
      await this._checkAndRedirect();
    }

    async componentDidUpdate() {
      await this._checkAndRedirect();
    }

    async _checkAndRedirect() {
      const { isAuthenticated } = this.state;

      if (isAuthenticated != JSON.parse(localStorage.getItem("vinder-auth"))) {
        this.setState({ isAuthenticated: JSON.parse(localStorage.getItem("vinder-auth")) == true ? true : false })
      }
    }

    render() {
      return (
          <WrappedComponent isAuthenticated={this.state.isAuthenticated} {...this.props} />
      );
    }
  }

  return Authenticate;
}