import React, { useContext } from 'react'
import { Button } from 'antd'

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext(themes.light);

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {

  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;

  render() {
    const {background} = this.context
    console.log(this.context)
    return <Button style={{background}} />;
  }
}

// 函数式
// function ThemedButton() {
//   const theme = useContext(ThemeContext);
//   return (
//     <Button style={{ background: theme.background, color: theme.foreground }}>
//       I am styled by theme context!
//     </Button>
//   );
// }
export default Index

