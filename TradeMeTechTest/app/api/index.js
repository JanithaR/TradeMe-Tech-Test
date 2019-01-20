import Config from '../config';
import config from '../config';

export async function getCategories(categoryNumber = '0') {
    try {
        const response = await fetch(`${Config.API_URL}${Config.CATEGORIES}${categoryNumber}.${Config.RESONSE_FORMAT}`);

        const json = await response.json();

        return json;
    } catch (error) {
        console.error(error);
    }
}

export async function search(category) {
    try {
        console.log('searching category...', category);

        const headers = {
            Authorization: `OAuth oauth_consumer_key="${Config.CONSUMER_KEY}", oauth_signature_method="PLAINTEXT", oauth_signature="${Config.CONSUMER_SECRET}&"`
        };

        const request = {
            method: 'GET',
            headers
        };
        const response = await fetch(`${Config.SANDBOX_API_URL}${Config.SEARCH}.${Config.RESONSE_FORMAT}?category=${category.Number}&rows=20`, request);

        const json = await response.json();

        return json;
    } catch (error) {
        console.error(error);
    }
}

export async function getListing(listing) {
    try {
        console.log('getting listing...', listing);

        const headers = {
            Authorization: `OAuth oauth_consumer_key="${Config.CONSUMER_KEY}", oauth_signature_method="PLAINTEXT", oauth_signature="${Config.CONSUMER_SECRET}&"`
        };

        const request = {
            method: 'GET',
            headers
        };
        const response = await fetch(`${Config.SANDBOX_API_URL}${Config.LISTINGS}${listing.ListingId}.${Config.RESONSE_FORMAT}`, request);

        const json = await response.json();

        return json;
    } catch (error) {
        console.error(error);
    }
}