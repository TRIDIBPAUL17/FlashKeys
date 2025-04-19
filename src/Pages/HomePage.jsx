import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Footer from "../Components/Footer";
import TypingBox from "../Components/TypingBox";
import { useTheme } from "../Context/ThemeContext";
import { GlobalStyles } from "../Styles/global"; // Import the GlobalStyles
import { auth } from "../firebaseConfig";
import Header from "../Components/Header";

var randomWords = require('random-words');

const HomePage = () => {
  const { theme } = useTheme();  // Get current theme from the context
  const words = randomWords(100);

  return (
    <ThemeProvider theme={theme}>  {/* Wrap the component with ThemeProvider to apply the selected theme */}
      <GlobalStyles />  {/* Apply global styles */}
      <div className="canvas" style={styles.container}>
        <div style={styles.box}>
          <Header />
          <div
  style={{
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
    marginTop: '-10px',
  }}
>
  🔥 Test your typing skills with speed and accuracy! 🔥
</div>
          <TypingBox words={words} />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '1rem',
    backgroundColor: 'transparent',  // No fixed background on the container
  },
  box: {
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // Light shadow for separation
    width: '80%',
    maxWidth: '1200px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    border: '2px solid',  // Border added for better visibility
    borderColor: (props) => props.theme.title,  // Border color changes with theme title color
    backgroundColor: (props) => props.theme.background,  // Box background color from the theme
    color: (props) => props.theme.title,  // Change text color based on the theme
    margin: 'auto',  // Center the box
  }
}

export default HomePage;
