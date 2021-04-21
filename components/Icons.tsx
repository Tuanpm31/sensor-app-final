import { Icon, IconProps, IconElement, TopNavigationAction } from "@ui-kitten/components";
import React from 'react';
import { ImageStyle } from 'react-native';

export const renderEmailIcon = (props: IconProps) => (
  <Icon {...props} name='email' />
);

export const renderPersonIcon = (props: IconProps) => (
  <Icon {...props} name='person' />
);

export const renderPlusIcon = (props: IconProps) => (
  <Icon {...props} name='plus' />
)

export const ArrowIosBackIcon = (props: IconProps) => (
  <Icon {...props} name='arrow-ios-back' />
);

export const BackIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-back" />
)

export const SettingIcon = (props: IconProps) => (
  <Icon {...props} name="settings" />
)

export const renderBackAction = () => (
  <TopNavigationAction icon={BackIcon} />
)

export const renderSettingsAction = () => (
  <TopNavigationAction icon={SettingIcon} />
)
