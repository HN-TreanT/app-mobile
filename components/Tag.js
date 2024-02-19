import { Text, View } from "react-native-animatable";


const Tag = ({text, type}) => {
  
   return (
        <Text className="font-normal" style={{
            color: type.color,
            paddingBottom:1,
            paddingTop:1,
            paddingRight:8,
            paddingLeft:8,
            borderRadius:3,
            borderColor:type.borderColor,
            borderWidth:1,
            backgroundColor:type.backgroundColor
        }}>{text}</Text>
   )

}

export default Tag