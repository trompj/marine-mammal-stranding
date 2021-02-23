import {useEffect} from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const GetStrandings = () => {
    let strandings = [];
    const { user, getAccessTokenSilently, getAccessTokenWithPopup, isAuthenticated } = useAuth0();

    useEffect(() => {
        const getStrandings = async () => {
            const domain = "dev-97ard54a.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });
                const userDetailsByIdUrl = `http://127.0.0.1:8080/strandings`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const strandingJson = await metadataResponse.json();
                strandings = strandingJson.strandings;
                console.log(strandings);

            } catch (e) {
                console.log(e.message);
            }
        };

        getStrandings();
    }, []);
};