output "droplet_id" {
  description = "ID of the droplet"
  value       = digitalocean_droplet.analytics.id
}

output "droplet_ip" {
  description = "Public IPv4 address of the droplet"
  value       = digitalocean_droplet.analytics.ipv4_address
}

output "reserved_ip" {
  description = "Reserved (static) IP address — use this for DNS records"
  value       = digitalocean_reserved_ip.analytics.ip_address
}

output "analytics_url" {
  description = "URL for Umami analytics"
  value = var.domain != "" && var.analytics_subdomain != "" ? (
    "https://${var.analytics_subdomain}.${var.domain}"
  ) : "http://${digitalocean_reserved_ip.analytics.ip_address}:3000"
}

output "listmonk_url" {
  description = "URL for Listmonk newsletter"
  value = var.domain != "" && var.listmonk_subdomain != "" ? (
    "https://${var.listmonk_subdomain}.${var.domain}"
  ) : "http://${digitalocean_reserved_ip.analytics.ip_address}:9000"
}

output "ssh_command" {
  description = "SSH command to connect to the droplet"
  value       = "ssh root@${digitalocean_reserved_ip.analytics.ip_address}"
}

output "next_steps" {
  description = "Next steps after deployment"
  value       = <<-EOT

    🚀 Deployment Complete!

    Your analytics and newsletter services are being set up.
    Wait 2-3 minutes for services to start, then access:

    📊 Umami Analytics: ${var.domain != "" && var.analytics_subdomain != "" ? "https://${var.analytics_subdomain}.${var.domain}" : "http://${digitalocean_reserved_ip.analytics.ip_address}:3000"}
       Default credentials: admin / umami
       ⚠️  Change password immediately after first login!

    📧 Listmonk Newsletter: ${var.domain != "" && var.listmonk_subdomain != "" ? "https://${var.listmonk_subdomain}.${var.domain}" : "http://${digitalocean_reserved_ip.analytics.ip_address}:9000"}
       Complete setup wizard on first visit

    🔧 SSH Access: ssh root@${digitalocean_reserved_ip.analytics.ip_address}

    📝 Check logs:
       ssh root@${digitalocean_reserved_ip.analytics.ip_address} 'cd /opt/analytics && docker-compose logs -f'

    ${var.domain == "" ? "\n⚠️  No domain configured - services accessible via IP only\n   Set domain variables for automatic SSL\n" : ""}
  EOT
}
