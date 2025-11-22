// Web shim for react-native's codegenNativeComponent
// On web, native components are replaced by react-native-web equivalents
export default function codegenNativeComponent(componentName) {
  // Return a simple component that renders nothing
  // Native components should be aliased to web equivalents via react-native-web
  return function WebStub() {
    return null
  }
}
