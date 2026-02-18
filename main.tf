terraform {
    required_providers {
        digitalocean = {
            source = "digitalocean/digitalocean"
            version = "~> 2.0"
        }
    }
}

provider "digitalocean" {
    token = var.do_token
}

resource "digitalocean_ssh_key" "my_key" {
    name = "my-desktop-key"
    public_key = file("~/.ssh/id_rsa.pub")
}

resource "digitalocean_droplet" "web" {
    image = "ubuntu-22-04-x64"
    name = "todo-api-server"
    region = "sfo3"
    size = "s-1vcpu-1gb"
    ssh_keys = [digitalocean_ssh_key.my_key.id]
}

resource "local_file" "ansible_inventory" {
  content  = <<EOT
[web_servers]
${digitalocean_droplet.web.ipv4_address} ansible_user=root ansible_ssh_private_key_file=~/.ssh/id_rsa
EOT
  filename = "inventory.ini"
}