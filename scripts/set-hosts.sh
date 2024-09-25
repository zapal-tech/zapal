# /bin/sh

# You can add your local dev hosts here (needed for subdomains in local dev)
echo "# Zapal local hosts" >> /etc/hosts

echo "127.0.0.1 cms.zapal.local" >> /etc/hosts
echo "::1 cms.zapal.local" >> /etc/hosts

echo "127.0.0.1 www.zapal.local" >> /etc/hosts
echo "::1 www.zapal.local" >> /etc/hosts

echo "127.0.0.1 estimate.zapal.local" >> /etc/hosts
echo "::1 estimate.zapal.local" >> /etc/hosts

echo "127.0.0.1 tech.zapal.local" >> /etc/hosts
echo "::1 tech.zapal.local" >> /etc/hosts

echo "127.0.0.1 design.zapal.local" >> /etc/hosts
echo "::1 design.zapal.local" >> /etc/hosts

echo "127.0.0.1 blog.zapal.local" >> /etc/hosts
echo "::1 blog.zapal.local" >> /etc/hosts

echo "# Zapal local hosts end" >> /etc/hosts
