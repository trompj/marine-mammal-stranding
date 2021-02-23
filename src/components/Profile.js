import React, {useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
    const { user, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-97ard54a.us.auth0.com";

            try {
                let accessToken = await getAccessTokenWithPopup({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });

                console.log(accessToken);
                console.log(`Bearer ${accessToken}`);

                const userDetailsByIdUrl = `http://127.0.0.1:8080/strandings`;
                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        'HTTP_AUTHORIZATION': `Bearer ${accessToken}`,
                    },
                });

                console.log(await metadataResponse.json());
                // setUserMetadata(user_metadata);
                // console.log(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, []);

    return (
        <Container className="m-5">
            <Row className="align-items-center profile-header mb-5 text-center text-md-left">
                <Col md={2}>
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </Col>
                <Col md>
                    <h2>User: {user.name}</h2>
                    <p className="lead text-muted">Email: {user.email}</p>
                </Col>
            </Row>
            <Row>
                {/*<Highlight>{JSON.stringify(user, null, 2)}</Highlight>*/}
            </Row>
        </Container>
    );
};

export default withAuthenticationRequired(ProfileComponent, {
    onRedirecting: () => <div>loading...</div>,
});
