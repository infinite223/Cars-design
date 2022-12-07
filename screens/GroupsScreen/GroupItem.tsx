import { Text, TouchableOpacity } from "react-native"
import { style } from './style';

interface GroupItemProps {
    myGroup?:boolean
}

export const GroupItem:React.FC<GroupItemProps> = () => {
    return (
        <TouchableOpacity style={style.groupContainer}>
            <Text></Text>


            {/* if myGroup exist .... more options, remove group and more */}
        </TouchableOpacity>
    )
}