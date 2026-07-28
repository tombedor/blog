variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "ssh_key_name" {
  description = "Name of the SSH key in DigitalOcean"
  type        = string
}

variable "droplet_name" {
  description = "Name of the droplet"
  type        = string
  default     = "blog-analytics"
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "nyc3"
}

variable "droplet_size" {
  description = "Droplet size (s-1vcpu-2gb = $12/mo, s-2vcpu-4gb = $24/mo)"
  type        = string
  default     = "s-1vcpu-2gb"
}

variable "ssh_allowed_ips" {
  description = "Required, explicit CIDR ranges allowed to SSH"
  type        = list(string)
  nullable    = false

  validation {
    condition = (
      length(var.ssh_allowed_ips) > 0 &&
      alltrue([for cidr in var.ssh_allowed_ips : can(cidrhost(cidr, 0))])
    )
    error_message = "ssh_allowed_ips must contain at least one valid IPv4 or IPv6 CIDR so bootstrap access is not disabled."
  }

  validation {
    condition = alltrue([
      for cidr in var.ssh_allowed_ips : !contains(["0.0.0.0/0", "::/0"], cidr)
    ])
    error_message = "ssh_allowed_ips must not expose SSH globally; use explicit administrative CIDRs such as your current IP with /32."
  }
}

variable "tags" {
  description = "Tags to apply to the droplet"
  type        = list(string)
  default     = ["analytics", "blog"]
}

variable "domain" {
  description = "Domain name (leave empty if not using DigitalOcean DNS)"
  type        = string
  default     = ""
}

variable "analytics_subdomain" {
  description = "Subdomain for analytics (e.g., 'analytics' for analytics.yourdomain.com)"
  type        = string
  default     = ""
}

variable "listmonk_subdomain" {
  description = "Subdomain for newsletter (e.g., 'newsletter' for newsletter.yourdomain.com)"
  type        = string
  default     = ""
}
