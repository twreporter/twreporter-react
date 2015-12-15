import React, {Component} from 'react';
export default class SystemError extends Component {
    render() {
        return (
                <div>
                    <div class="nav-menu">
                        <div class="nav_logo" style="text-align: center;">
                            <a href="#"><img height="81" src="/asset/logo.png"/></a>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <img class="error_img" src="/asset/500.jpg" width="80%" height="auto">
                    </div>
                </div>
               );
    }
}
