import React, { useState } from "react"
import { useRoutes, useNavigate } from "react-router-dom"
import routes from "./router"
import { Breadcrumb, Button, Layout, Menu } from "antd"
import { ConnectWeb3Button } from "./components/ConnectWeb3Button"
import { useConnectModal, connectorsForWallets } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import "./common/styles/reset.less"
import "./app.less"

const { Header, Content } = Layout

const App: React.FC = () => {
  const {isConnected} = useAccount();
  const element = useRoutes(routes)
  const { openConnectModal } = useConnectModal()
  const navigate = useNavigate()
  const needsInjectedWalletFallback =
    typeof window !== "undefined" &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet
  // 判断是否登录了钱包
  const isLogin = () => {
    if(isConnected){
      return true;
    }else{
      openConnectModal && openConnectModal();
      return false;
    }
  }

  // 处理函数
  const handlerNavigate = (path: string, params?: any) => {
    if (isLogin()) {
      params ? navigate(path, params) : navigate(path)
    }
  }
  return (
    <Layout className="layout">
      <Header
        style={{
          background: "none",
          boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Power Voting
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            className="menu_btn"
            type="primary"
            onClick={() => {
              handlerNavigate("/createpoll")
            }}
          >
            Create A Poll
          </Button>
          <ConnectWeb3Button />
        </div>
      </Header>
      <Content style={{ padding: "20px 50px", background: "#fff" }}>
        {element}
      </Content>
    </Layout>
  )
}

export default App
