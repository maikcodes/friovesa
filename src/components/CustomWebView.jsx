import WebView from "react-native-webview";

export default function CustomWebView({ htmlContent }) {
  const handleShouldStartLoad = (event) => {
    const { url } = event;

    if (url.startsWith("http://") || url.startsWith("https://")) {
      Linking.openURL(url);
    }

    return false;
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: htmlContent,
      }}
      style={{ height: 800, flex: 1 }}
      onShouldStartLoadWithRequest={handleShouldStartLoad}
    />
  );
}
