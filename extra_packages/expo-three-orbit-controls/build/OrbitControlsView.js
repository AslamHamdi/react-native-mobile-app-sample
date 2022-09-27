import * as React from 'react';
import { View, Platform, PanResponder, Animated, Dimensions } from 'react-native';
import { OrbitControls } from './OrbitControls';
import { EventDispatcher, MOUSE, Quaternion, Spherical, TOUCH, Vector2, Vector3, } from 'three';
function polyfillEventTouches(nativeEvent) {
    if (Platform.OS === 'web')
        return nativeEvent;
    if (!Array.isArray(nativeEvent.touches))
        nativeEvent.touches = [];
    if (Array.isArray(nativeEvent.changedTouches)) {
        if (!nativeEvent.touches.length) {
            nativeEvent.touches = nativeEvent.changedTouches;
        }
    }
    return nativeEvent;
}

const { height, width } = Dimensions.get("window");

const OrbitControlsView = React.forwardRef(({ camera, handleMouse, ...props }, ref) => {
    var _a;
    const [size, setSize] = React.useState(null);
    const [pan, setPan] = React.useState(new Animated.ValueXY())
    const [mouse, setMouse] = React.useState(new Vector2(-10, -10))
    const [val, setVal] = React.useState({ x: 0, y: 0 }); 
    const viewRef = React.useRef(null);
    const controls = React.useMemo(() => {
        var _a;
        if (camera && ((_a = viewRef) === null || _a === void 0 ? void 0 : _a.current)) {
            return new OrbitControls(camera, viewRef.current);
        }
        return null;
    }, [camera, (_a = viewRef) === null || _a === void 0 ? void 0 : _a.current]);
    React.useImperativeHandle(ref, () => ({
        getControls() {
            return controls;
        },
    }), [controls]);
    const responder = React.useMemo(() => {
        function onTouchEnded(nativeEvent) {
            var _a;
            const polyfill = polyfillEventTouches(nativeEvent);
            // If only one touch then we may be encountering the bug where pan responder returns a two finger touch-end event in two different calls. :/
            // RNGH doesn't have this issue.
            const isMisfiredNativeGesture = Platform.OS !== 'web' && nativeEvent.identifier > 1;
            if (isMisfiredNativeGesture) {
                return;
            }
            return (_a = controls) === null || _a === void 0 ? void 0 : _a.onTouchEnd(polyfill);
        }
        return PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant({ nativeEvent}, gestureState) {
                mouse.x = (nativeEvent.locationX / width) * 2 - 1;
                mouse.y = -(nativeEvent.locationY / height) * 2 + 1;
                handleMouseChange(mouse)
                this.onLongPressTimeOut = setTimeout(() => {
                    console.log("GESTURE EVENT: ", gestureState)
                    if (gestureState.x0 <= width/2 )
                    {
                        console.log("SHORT PRESS")
                    }else {
                        console.log("LONG PRESS")
                    }
                }, 1000);
                var _a;
                let data = [(_a = controls) === null || _a === void 0 ? void 0 : _a.onTouchStart(nativeEvent)]
                return data;
            },
            onPanResponderMove({ nativeEvent }) {
                var _a;
                // mouse.x = (nativeEvent.locationX / width) * 2 - 1;
                // mouse.y = -(nativeEvent.locationY / height) * 2 + 1;
                mouse.x = -10
                mouse.y = -10
                handleMouseChange(mouse)
                handleMouseChange(mouse)
                handleRayCastPoint()
                return (_a = controls) === null || _a === void 0 ? void 0 : _a.onTouchMove(nativeEvent);
            },
            onPanResponderRelease({ nativeEvent }) {
                let data =[onTouchEnded(nativeEvent)]
                mouse.x = -10;
                mouse.y = -10;
                handleMouseChange(mouse)
                return onTouchEnded(nativeEvent);
            },
            onPanResponderTerminate({ nativeEvent }) {
                return onTouchEnded(nativeEvent);
            },
        });
    }, [controls]);
    const handleMouseChange =  (val) => {
        //props.children.props.handleMouse(val)       
    };
    const handleRayCastPoint = () => {
        //props.children.props.handleRayCast()
        //console.log(props.children.props)   
    }
    React.useEffect(() => {
        if (!controls || !size) {
            return;
        }
        controls.width = size.width;
        controls.height = size.height;
    }, [size, controls]);
    return (<View {...props} ref={viewRef} {...responder.panHandlers} onLayout={event => {
        if (props.onLayout) {
            props.onLayout(event);
        }
        setSize(event.nativeEvent.layout);
    }}/>);
});
export default OrbitControlsView;
//# sourceMappingURL=OrbitControlsView.js.map