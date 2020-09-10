import React, { useState, useEffect } from 'react';
import LogoUrl from './logo.svg';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { useStores } from '../stores';
import { observer } from 'mobx-react';


const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #1D6A96;
  color: #fff;
`;

const Logo = styled.img`
  height: 30px;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;

  &.active {
    border-bottom: 1px solid #fff;
  }
`;

const Login = styled.div`
  margin-left: auto;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;


const  Component = observer(() => {

  const history = useHistory();
  const { UserStore, AuthStore } = useStores();

  const handleLogout = () => {
    AuthStore.logout();
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleRegister = () => {
    history.push('/register');
  }

  useEffect(()=>{
    UserStore.pullUser();
  },[])

  return (
      <Header>
        <Logo src={LogoUrl} />
        <nav>
          <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
          <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
          <StyledLink to="/about" activeClassName="active">关于生成姬</StyledLink>
        </nav>
        <Login>
          {
            UserStore.currentUser ? <>已验证ID：
              {UserStore.currentUser.attributes.username} <StyledButton type="primary" onClick={handleLogout}>注销验证</StyledButton>
            </> :<>
              <StyledButton type="primary" onClick={handleLogin}>验证通行证</StyledButton>
              <StyledButton type="primary" onClick={handleRegister}>申请通行证</StyledButton>
            </>
          }
        </Login>

      </Header>
  );
});

export default Component;