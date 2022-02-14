import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Field } from "./Field";

export default {
	title: "Field",
	component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const Common = Template.bind({});
Common.args = { label: "Common field" };
