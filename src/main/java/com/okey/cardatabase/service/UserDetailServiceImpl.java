package com.okey.cardatabase.service;

import com.okey.cardatabase.domain.User;
import com.okey.cardatabase.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private UserRepository userRepository;

    public UserDetailServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User currentUser = userRepository.findByUsername(username);
        return new org.springframework.security.core.userdetails.User(username, currentUser.getPassword(),
                true, true, true, true,
                 AuthorityUtils.createAuthorityList(currentUser.getRole()));
    }
}
