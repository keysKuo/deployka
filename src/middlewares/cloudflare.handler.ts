import axios from "axios";
import { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID, DOMAIN, SERVER_IP_ADDRESS } from "../constants"
const zoneId = CLOUDFLARE_ZONE_ID;
const apiToken = CLOUDFLARE_API_TOKEN;
const ipAddress = SERVER_IP_ADDRESS;

type DnsRecord = {
    id: string;
    name: string;
}

export const createSubDomain = async (subname: string, storedId: string) => {
    const subdomain = `${subname}-${storedId}`;

    try {
        const dnsRecord: DnsRecord = await axios.post(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
            {
                type: 'A',
                name: subdomain,
                content: ipAddress,
                ttl: 1,
                proxied: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                },
            }
        ).then(response => response.data.result);

        console.log('Subdomain created:', dnsRecord.name);
        return dnsRecord.name;
    } catch (error) {
        console.error('Error creating subdomain:', error);
    }
}

export const deleteSubDomain = async (subname: string, storedId: string) => {
    const subdomain = `${subname}-${storedId}.${DOMAIN}`;

    try {
        // Lấy danh sách các DNS records để tìm ID của subdomain cần xóa
        const dnsRecords: DnsRecord[] = await axios.get(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                }
            }
        ).then(response => response.data.result);
        const record = dnsRecords.find(
            (rec) => rec.name === subdomain
        );

        if (!record) {
            console.log('Subdomain not found:', subdomain);
            return;
        }

        // Gọi API để xóa DNS record của subdomain
        const deleteResponse = await axios.delete(
            `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${record.id}`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (deleteResponse.data?.success) {
            console.log('Subdomain deleted successfully:', subdomain);
        } else {
            console.error('Error deleting subdomain:', deleteResponse.data?.errors);
        }
    } catch (error) {
        console.error('Error deleting subdomain:', error);
    }

}
