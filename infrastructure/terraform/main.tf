terraform {
  required_version = ">= 1.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

# SSH Key
data "digitalocean_ssh_key" "default" {
  name = var.ssh_key_name
}

# Droplet with Docker pre-installed
resource "digitalocean_droplet" "analytics" {
  name   = var.droplet_name
  region = var.region
  size   = var.droplet_size
  image  = "docker-20-04"  # Ubuntu 20.04 with Docker pre-installed

  ssh_keys = [data.digitalocean_ssh_key.default.id]

  # User data to set up Docker Compose and deploy services
  user_data = templatefile("${path.module}/cloud-init.yml", {
    docker_compose_content = filebase64("${path.module}/../docker/docker-compose.yml")
    caddyfile_content      = filebase64("${path.module}/../docker/caddy/Caddyfile")
    env_content            = filebase64("${path.module}/../docker/.env")
  })

  tags = var.tags
}

# Firewall
resource "digitalocean_firewall" "analytics" {
  name = "${var.droplet_name}-firewall"

  droplet_ids = [digitalocean_droplet.analytics.id]

  # SSH
  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = var.ssh_allowed_ips
  }

  # HTTP
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # HTTPS
  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allow all outbound
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

# Optional: Domain A record (if using DigitalOcean DNS)
resource "digitalocean_record" "analytics" {
  count = var.domain != "" && var.analytics_subdomain != "" ? 1 : 0

  domain = var.domain
  type   = "A"
  name   = var.analytics_subdomain
  value  = digitalocean_droplet.analytics.ipv4_address
  ttl    = 300
}

resource "digitalocean_record" "listmonk" {
  count = var.domain != "" && var.listmonk_subdomain != "" ? 1 : 0

  domain = var.domain
  type   = "A"
  name   = var.listmonk_subdomain
  value  = digitalocean_droplet.analytics.ipv4_address
  ttl    = 300
}
