/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    StyleSheet,
    AsyncStorage,
    TouchableNativeFeedback,
    NetInfo
} from 'react-native'
// components / views
import List from '../components/List'
import Button from '../components/Button'
// libs/functions
import Crypto from '../libs/Crypto'
import { Request, UNAUTHORIZED } from '../libs/network'
import { storeAttendanceLocally, storeClasses, storePupils } from '../actions'
// constants
import { SID_LOGIN, SID_TAKE_ATTENDANCE } from '../screens'
import { ICONS, COLORS, VERIFY_TOKEN, AS_USERNAME } from '../constants'
import Utils from '../libs/Utils'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
        }

        this.renderItem = this.renderItem.bind(this)
        this.onRenderItemPress = this.onRenderItemPress.bind(this)
    }

    componentDidMount() {
        this.loginIfRequired()
        this.keypairExistOrCreate()
        Utils.getClasses(this.props)
        Utils.getChildren(this.props)

        //prewarm location cache
        Utils.getCurrentPosition()
    }

    componentWillReceiveProps(nextProps) {
        // needed for triggering a re-render after login
        if (this.props.session.token !== nextProps.session.token) {
            Utils.getClasses(nextProps)
            Utils.getChildren(nextProps)
        }
    }

    // TODO: dialog for password input
    // Check whether staff member has a keypair for signing
    async keypairExistOrCreate() {
        if (!await Crypto.hasKey()) {
            // create etherum-compliant ECDSA key
            const keypair = await Crypto.createStaffKeyPair()
            if (keypair === false) {
                Alert.alert('Error', 'Failed to generate ECDSA key, please contact the support.')
            }
        }
    }

    async loginIfRequired() {
        let connectionInfo = await NetInfo.getConnectionInfo()
        console.log("connection info - " + JSON.stringify(connectionInfo))
        let offline = (connectionInfo.type === "none" || connectionInfo.type === "unkown")
        const { session } = this.props
        if (!session.token || !session.user || (Utils.hasTokenExpired(session.token) && !offline)) {
            return this.goToLogin()
        }
    }

    async goToLogin() {
        let username = null
        try {
            username = await AsyncStorage.getItem(AS_USERNAME)
        } catch (e) {
            console.log(e)
        }

        this.props.navigator.showModal({
            title: 'Login',
            screen: SID_LOGIN,
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            },
            passProps: {
                username: username || '',
                onLoginCompleted: () => false
            },
            overrideBackPress: true,
        })
        return true
    }

    renderItem({ item }) {
        return (
            <Button
                nativeFeedback={true}
                style={styles.rowContainer}
                onPress={() => this.onRenderItemPress(item)}>
                <View>
                    <Text style={styles.rowTextTitle}>{item.name}</Text>
                    <Text style={styles.rowTextDesc}>{item.attended ? 'Attended' : 'Not attended'}</Text>
                </View>
                <Image source={ICONS.navigateRight12} style={styles.rowImage} />
            </Button>
        )
    }

    onRenderItemPress(item) {
        this.props.navigator.push({
            title: item.name,
            screen: SID_TAKE_ATTENDANCE,
            passProps: {
                classObj: item,
                session: this.props.session,
                pupils: this.props.pupils,
                classes: this.props.classes,
                storeAttendanceLocally: this.props.storeAttendanceLocally,
            }
        })
    }

    render() {
        const { session } = this.props

        if (!session.token || !session.user)
            return null

        return (
            <View style={styles.container} collapsable={true}>
                {/* Info */}
                <View style={styles.infoContainer} collapsable={true}>
                    <View style={styles.infoInnerContainer} collapsable={true}>
                        <Image source={ICONS.person20} style={[styles.infoIcon, { marginRight: 5 }]} resizeMode={'contain'} />
                        <Text style={styles.infoText}>{session.user.given_name} {session.user.family_name}</Text>
                    </View>
                    <View style={styles.infoInnerContainer}>
                        <Text style={styles.infoText}>{session.user.centre.name}</Text>
                        <Image source={ICONS.home20} style={[styles.infoIcon, { marginLeft: 5 }]} resizeMode={'contain'} />
                    </View>
                </View>
                {/* Additional info */}
                <View style={styles.infoContainer} collapsable={true}>
                    <View style={styles.infoInnerContainer} collapsable={true}>
                        <Image source={ICONS.people20} style={[styles.infoIcon, { marginRight: 5 }]} resizeMode={'contain'} />
                        <Text style={styles.infoText}>{session.meta.childrenCount} Children</Text>
                    </View>
                    <View style={styles.infoInnerContainer}>
                        <Text style={styles.infoText}>{session.meta.staffCount} Staff Members</Text>
                        <Image source={ICONS.peopleOutline20} style={[styles.infoIcon, { marginLeft: 5 }]} resizeMode={'contain'} />
                    </View>
                </View>

                {this.props.offlineAttendances.length !== 0 && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.attendancesWaiting}>Attendances waiting to be taken. </Text>
                        <TouchableNativeFeedback onPress={() => this.props.navigator.switchToTab({ tabIndex: 3 })}>
                            <Text style={[styles.attendancesWaiting, { textDecorationLine: 'underline' }]}>Go to Setting for sync</Text>
                        </TouchableNativeFeedback>
                    </View>
                )}

                <List
                    style={styles.list}
                    data={this.props.classes}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<Text style={styles.headerText}>Classes</Text>} />
            </View>
        )
    }
}
Home.propTypes = {
    session: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    offlineAttendances: PropTypes.array.isRequired,
    storeAttendanceLocally: PropTypes.func.isRequired,
    storeClasses: PropTypes.func.isRequired,
    storePupils: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.greyWhite,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoInnerContainer: {
        flex: 0.5,
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoIcon: {
        width: 20,
        height: 20,
    },
    infoText: {
        fontSize: 14,
        fontWeight: '200',
        color: COLORS.grey,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkGrey2,
    },
    attendancesWaiting: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        paddingVertical: 4,
    },
    list: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: COLORS.white,
    },
    rowContainer: {
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        borderBottomColor: COLORS.lightGrey,
    },
    rowTextTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.darkGrey2,
    },
    rowTextDesc: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '200',
        color: COLORS.grey,
    },
    rowImage: {
        width: 12,
        height: 12,
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        storeAttendanceLocally: (attendance) => dispatch(storeAttendanceLocally(attendance)),
        storeClasses: (classes) => dispatch(storeClasses(classes)),
        storePupils: (pupils) => dispatch(storePupils(pupils)),
    }
}

const mapStoreToProps = (store) => {
    return {
        session: store.session,
        offlineAttendances: store.offline.attendances,
        pupils: store.pupils,
        classes: store.classes,
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Home)
