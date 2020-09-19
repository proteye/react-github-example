import React, {ReactNode} from 'react';
import {Layout} from 'antd';
import './BaseLayout.scss';

const {Header, Footer, Content} = Layout;

type Props = {
  children: ReactNode;
};

function BaseLayout(props: Props) {
  return (
    <Layout>
      <Header className="BaseLayout__header">
        <h1>React Github Example</h1>
      </Header>
      <Layout>
        <Content className="BaseLayout__content">
          {props.children}
        </Content>
      </Layout>
      <Footer>
        <span>Copyright © 2020 | @proteye</span>
      </Footer>
    </Layout>
  );
}

export default BaseLayout;
