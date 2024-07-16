import { View, Modal, KeyboardAvoidingView, Platform } from "react-native";

export default function CustomModal({
  isOpen,
  children,
  withInput,
  handleClose,
  ...props
}) {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
      {...props}
    >
      {withInput ? (
        <KeyboardAvoidingView
          className="items-center justify-center flex-1 px-3 bg-zinc-900/40"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        <View className="items-center justify-center flex-1 px-3 bg-zinc-900/40">
          {children}
        </View>
      )}
    </Modal>
  );
}
