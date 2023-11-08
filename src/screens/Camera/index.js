import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import React, { useEffect ,useState  } from 'react';
import { cameraStyle } from './style';

export default function MyCamera() {
    let n =null
    const [hasPermission, setHasPermission] = useState(n);
    let d =Camera.Constants.Type.back
    const [type, setType] = useState(d);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            let z =(status === 'granted')
            setHasPermission(z);
        })();
    }, []);

    let x=hasPermission === null
    let y=hasPermission === false
    if (x) {
        return <View />;
    }
    if (y) {
        return <Text>Camera permission is not there</Text>;
    }

    return (
        <View style={[cameraStyle.mainView]}>
            <Camera style={[cameraStyle.childView]} type={type}>
                <View style={[cameraStyle.deepView]}>
                    <TouchableOpacity
                        style={[cameraStyle.touchStyle]}
                        onPress={() => {
                        setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                        );
                    }}>
                        <Text style={[cameraStyle.textStyle]}> Rotate Camera </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}