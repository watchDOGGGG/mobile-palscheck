import React from 'react'
import { Modal, Button } from 'antd';
import Login from './Login.jsx'
import Register from './Register.jsx'
class Welcome extends React.Component {
    state = {
        loading1: false,
        visible1: false,
        loading: false,
        visible: false,
      };
    

      //Login
      showModal1 = () => {
        this.setState({
          visible1: true,
        });
      };
    
      handleOk1 = () => {
        this.setState({ loading1: true });
        setTimeout(() => {
          this.setState({ loading1: false, visible1: false });
        }, 3000);
      };
    
      handleCancel1 = () => {
        this.setState({ visible1: false });
      };

      updateRoute=(e)=>{
        this.props.UpdateAuth(1)
      }
      redirectUser = (e)=>{
        this.props.redirectHome(e)
      }

      //Register
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };

    render() {
        const { visible1, loading1,visible, loading } = this.state;
        return(
            <div>
                <section class="hero">
                    <header id="header">
                        <nav>

                            <Button type="primary" onClick={this.showModal1}>
                                Login
                            </Button>
                            <Button type="primary" className="ml2" onClick={this.showModal}>
                                Register
                            </Button>
                        </nav>
                    </header>
                    <header class="hero-header center">
                        <h1 class="hero-title f1 tc">Get connected, share what's new and keep up with trends</h1>
                    </header>
                    <footer class="hero-footer">
                        <a class="button button-primary" href="#">button one</a>
                        <a class="button" href="#">button two</a>
                    </footer>
                </section>
                <article className="arti_cont w-100 center ">
                    <h2 className="b">For the next great business</h2>
                    <p className="f4">
                    Palscheck is a Nigeria social network that allow user's get connected in every part of the world. Palscheck also help's provide users with tools to build up business ideas either a large scale or small scale business. we provide an awsome feedline for users to express themselves sharing update of happening’s and live trends, current issues round the world, debate on them and join conversations of thousands of people.
                    </p>
                    <span>
                        <a href="https://about.palscheck.com/about.php" className="blue underline f5">Learn more</a>
                    </span>
                    </article>
                    

                {/* Modal */}
                
        <Modal
          visible={visible1}
          title="Login"
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          footer={[]}
        >
          <Login updateAuth={this.updateRoute} redirectHome={this.redirectUser}/>
        </Modal>
        <Modal
          visible={visible}
          title="Register"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Register/>
        </Modal>
            </div>
        )
    }
}
export default Welcome